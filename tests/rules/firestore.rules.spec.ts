import { describe, it, beforeAll, afterAll, beforeEach } from 'vitest';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';

const PROJECT_ID = 'demo-cyber-detective';

describe('Firestore Security Rules', () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: readFileSync('firestore.rules', 'utf8'),
        host: '127.0.0.1',
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  // 1. користувач не може змінити points, role, createdAt, uid, email у своєму users-документі
  it('користувач не може змінити points, role, createdAt, uid, email у своєму users-документі', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().doc('users/alice').set({
        nickname: 'Alice',
        points: 10,
        role: 'user',
        createdAt: '2026-01-01T00:00:00Z',
        email: 'alice@example.com',
        theme: 'light',
        language: 'uk',
        avatar: 'avatar1.png',
      });
    });

    const alice = testEnv.authenticatedContext('alice');

    // Спроби змінити заборонені поля
    await assertFails(alice.firestore().doc('users/alice').update({ points: 100 }));
    await assertFails(alice.firestore().doc('users/alice').update({ role: 'admin' }));
    await assertFails(alice.firestore().doc('users/alice').update({ createdAt: '2026-02-02T00:00:00Z' }));
    await assertFails(alice.firestore().doc('users/alice').update({ uid: 'bob' }));
    await assertFails(alice.firestore().doc('users/alice').update({ email: 'new@example.com' }));

    // Спроба створити документ із забороненими полями
    await assertFails(
      alice.firestore().doc('users/alice2').set({
        nickname: 'Alice2',
        points: 50,
        role: 'admin',
      })
    );

    // Дозволене оновлення дозволених полів
    await assertSucceeds(
      alice.firestore().doc('users/alice').update({
        nickname: 'SuperAlice',
        theme: 'dark',
        language: 'en',
      })
    );
  });

  // 2. користувач не може читати scenarioSecrets
  it('користувач не може читати scenarioSecrets', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().doc('scenarioSecrets/sec-1').set({
        correctAnswer: 'dangerous',
        explanation: { uk: 'Пояснення', en: 'Explanation' },
      });
    });

    const alice = testEnv.authenticatedContext('alice');
    const admin = testEnv.authenticatedContext('admin-user', { admin: true });

    await assertFails(alice.firestore().doc('scenarioSecrets/sec-1').get());
    await assertFails(admin.firestore().doc('scenarioSecrets/sec-1').get());
  });

  // 3. звичайний користувач не може створити або змінити scenarios
  it('звичайний користувач не може створити або змінити scenarios', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().doc('scenarios/sc-1').set({
        points: 10,
        firstTryBonus: 5,
        tier: 1,
        type: 'binary',
        title: { uk: 'Сценарій 1', en: 'Scenario 1' },
      });
    });

    const alice = testEnv.authenticatedContext('alice');

    await assertFails(
      alice.firestore().doc('scenarios/sc-new').set({
        points: 20,
        firstTryBonus: 5,
        tier: 1,
        type: 'binary',
      })
    );

    await assertFails(
      alice.firestore().doc('scenarios/sc-1').update({
        points: 30,
      })
    );
  });

  // 4. адмін (з custom claim admin: true) може створити scenarios з коректними полями, але не з points більше 100
  it('адмін (з custom claim admin: true) може створити scenarios з коректними полями, але не з points більше 100', async () => {
    const admin = testEnv.authenticatedContext('admin-user', { admin: true });

    // Коректне створення
    await assertSucceeds(
      admin.firestore().doc('scenarios/sc-valid').set({
        points: 50,
        firstTryBonus: 20,
        tier: 2,
        type: 'quiz',
        title: { uk: 'Правильний', en: 'Valid' },
      })
    );

    // Points більше 100 заборонено
    await assertFails(
      admin.firestore().doc('scenarios/sc-invalid-points').set({
        points: 101,
        firstTryBonus: 10,
        tier: 1,
        type: 'binary',
      })
    );

    // firstTryBonus більше 50 заборонено
    await assertFails(
      admin.firestore().doc('scenarios/sc-invalid-bonus').set({
        points: 50,
        firstTryBonus: 51,
        tier: 1,
        type: 'binary',
      })
    );

    // tier поза 1..3 заборонено
    await assertFails(
      admin.firestore().doc('scenarios/sc-invalid-tier').set({
        points: 50,
        firstTryBonus: 10,
        tier: 4,
        type: 'binary',
      })
    );

    // некоректний type заборонено
    await assertFails(
      admin.firestore().doc('scenarios/sc-invalid-type').set({
        points: 50,
        firstTryBonus: 10,
        tier: 1,
        type: 'unknown-type',
      })
    );
  });

  // 5. користувач не може писати в progress і attempts з клієнта
  it('користувач не може писати в progress і attempts з клієнта', async () => {
    const alice = testEnv.authenticatedContext('alice', { email_verified: true });

    await assertFails(
      alice.firestore().doc('progress/alice').set({
        points: 100,
        tier: 2,
      })
    );

    await assertFails(
      alice.firestore().doc('attempts/att-1').set({
        uid: 'alice',
        scenarioId: 'sc-1',
        isCorrect: true,
      })
    );
  });

  // 6. користувач без підтвердженого email не може читати свій progress
  it('користувач без підтвердженого email не може читати свій progress', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().doc('progress/unverified-user').set({
        points: 25,
        tier: 1,
      });
    });

    const unverified = testEnv.authenticatedContext('unverified-user', { email_verified: false });
    await assertFails(unverified.firestore().doc('progress/unverified-user').get());
  });

  // 7. користувач бачить лише свій progress, чужий читати не може
  it('користувач бачить лише свій progress, чужий читати не може', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().doc('progress/alice').set({ points: 50, tier: 1 });
      await context.firestore().doc('progress/bob').set({ points: 75, tier: 1 });
    });

    const alice = testEnv.authenticatedContext('alice', { email_verified: true });

    // Свій progress читається
    await assertSucceeds(alice.firestore().doc('progress/alice').get());

    // Чужий progress читати заборонено
    await assertFails(alice.firestore().doc('progress/bob').get());
  });

  // 8. неавторизований користувач не може читати scenarios
  it('неавторизований користувач не може читати scenarios', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await context.firestore().doc('scenarios/sc-1').set({
        points: 10,
        firstTryBonus: 5,
        tier: 1,
        type: 'binary',
      });
    });

    const unauthed = testEnv.unauthenticatedContext();
    const alice = testEnv.authenticatedContext('alice');

    // Неавторизований не може
    await assertFails(unauthed.firestore().doc('scenarios/sc-1').get());

    // Авторизований може
    await assertSucceeds(alice.firestore().doc('scenarios/sc-1').get());
  });
});
