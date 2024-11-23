import { Test, TestingModule } from '@nestjs/testing';
import { ParseDriverIdPipe } from '@application/adapters/pipes';

describe('ParseDriverIdPipe', () => {
  let sut: ParseDriverIdPipe;

  beforeEach(async () => {
    jest.clearAllMocks();

    const app: TestingModule = await Test.createTestingModule({
      providers: [ParseDriverIdPipe],
    }).compile();

    sut = app.get<ParseDriverIdPipe>(ParseDriverIdPipe);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('transform', () => {
    it('should parse a valid number string', () => {
      expect(sut.transform('42')).toBe(42);
    });

    it('should return undefined for null input', () => {
      expect(sut.transform(null)).toBeUndefined();
    });

    it('should return undefined for undefined input', () => {
      expect(sut.transform(undefined)).toBeUndefined();
    });

    it('should return undefined for an invalid number string', () => {
      expect(sut.transform('abc')).toBeUndefined();
    });

    it('should parse a valid number with whitespace', () => {
      expect(sut.transform(' 42 ')).toBe(42);
    });

    it('should handle numbers directly', () => {
      expect(sut.transform(42)).toBe(42);
    });
  });
});
