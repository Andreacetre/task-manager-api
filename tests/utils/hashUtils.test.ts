import bcrypt from 'bcrypt';

describe('Utils: Hash de contraseñas', () => {
  it('debería encriptar y validar correctamente una contraseña', async () => {
    const password = '123456*';
    const hashed = await bcrypt.hash(password, 10);

    expect(hashed).not.toBe(password);

    const isMatch = await bcrypt.compare(password, hashed);
    expect(isMatch).toBe(true);
  });

  it('debería fallar si la contraseña es incorrecta', async () => {
    const password = '123456*';
    const hashed = await bcrypt.hash(password, 10);

    const isMatch = await bcrypt.compare('otroPass', hashed);
    expect(isMatch).toBe(false);
  });
});
