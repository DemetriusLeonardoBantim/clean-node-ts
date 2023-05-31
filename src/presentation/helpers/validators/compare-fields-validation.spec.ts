import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'wrong_value' })
    expect(error).toBe(new InvalidParamError('field'))
  })

  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldToCompare: 'wrong_value' })
    expect(error).toBe(new InvalidParamError('field'))
  })
})
