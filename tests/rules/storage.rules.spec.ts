import { describe, it, beforeAll, afterAll } from 'vitest';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';

const PROJECT_ID = 'demo-cyber-detective';

describe('Storage Security Rules', () => {
  let testEnv: RulesTestEnvironment;

  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      storage: {
        rules: readFileSync('storage.rules', 'utf8'),
        host: '127.0.0.1',
        port: 9199,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  it('storage: адмін може записати webp, звичайний користувач не може, файл більший за 2 МБ відхиляється', async () => {
    const admin = testEnv.authenticatedContext('admin-user', { admin: true });
    const alice = testEnv.authenticatedContext('alice');
    const unauthed = testEnv.unauthenticatedContext();

    const smallWebp = Buffer.from('RIFF....WEBPVP8 ...');
    const smallPng = Buffer.from('\x89PNG\r\n\x1a\n...');
    const largeFile = Buffer.alloc(2 * 1024 * 1024 + 1024); // > 2MB

    // 1. Звичайний користувач не може записати webp
    await assertFails(
      alice.storage().ref('scenarios/meme.webp').put(smallWebp, { contentType: 'image/webp' })
    );

    // 2. Неавторизований не може записати
    await assertFails(
      unauthed.storage().ref('scenarios/meme.webp').put(smallWebp, { contentType: 'image/webp' })
    );

    // 3. Адмін може записати webp
    await assertSucceeds(
      admin.storage().ref('scenarios/meme.webp').put(smallWebp, { contentType: 'image/webp' })
    );

    // 4. Адмін може записати png
    await assertSucceeds(
      admin.storage().ref('scenarios/meme.png').put(smallPng, { contentType: 'image/png' })
    );

    // 5. Адмін не може записати файл більший за 2 МБ
    await assertFails(
      admin.storage().ref('scenarios/large.webp').put(largeFile, { contentType: 'image/webp' })
    );

    // 6. Недозволений тип контенту (наприклад, text/plain) відхиляється
    await assertFails(
      admin.storage().ref('scenarios/script.sh').put(Buffer.from('#!/bin/sh'), { contentType: 'text/plain' })
    );

    // 7. Авторизований користувач може читати
    await assertSucceeds(
      alice.storage().ref('scenarios/meme.webp').getDownloadURL()
    );

    // 8. Неавторизований користувач не може читати
    await assertFails(
      unauthed.storage().ref('scenarios/meme.webp').getDownloadURL()
    );
  });
});
