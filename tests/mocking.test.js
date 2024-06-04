import { describe, expect, it, test, vi } from 'vitest';

describe("suite test", () => {

  test("test case 1", () => {



  })
})

describe("test suite mock", () => {
  it("test case", () => {

    // create a mock for the following function
    const sendMessage = vi.fn();
    sendMessage.mockReturnValue("ok")

    // Call the mock function is called
    const result = sendMessage("message");

    // Assert that the result is 'ok'
    expect(sendMessage).toHaveBeenCalledWith("message");

    expect(result).toBe("ok")
  })
})

