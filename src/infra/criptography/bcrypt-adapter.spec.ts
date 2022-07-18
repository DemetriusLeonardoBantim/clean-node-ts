import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

const VARIABLE_SALT = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(VARIABLE_SALT)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash') as unknown as jest.Mock<
    ReturnType<(key: Error) => Promise<Error>>,
    Parameters<(key: Error) => Promise<Error>>
    >
    hashSpy.mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_value')
    expect(promise).rejects.toThrow()
  })
})
