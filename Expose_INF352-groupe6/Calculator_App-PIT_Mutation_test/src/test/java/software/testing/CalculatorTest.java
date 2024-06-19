package software.testing;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorTest {

    @Test
    public void testAdd() {
        Calculator calculate = new Calculator();
        double result = calculate.Add(4.57, 5);
        assertEquals(9.57, result);
    }

    @Test
    public void testSubtract() {
        Calculator calculate = new Calculator();
        double result = calculate.Subtract(8, 6.5);
        assertEquals(1.5, result);
    }

    @Test
    public void testMultiply() {
        Calculator calculate = new Calculator();
        double result = calculate.Multiply(4.5, 3.5);
        assertEquals(15.75, result);
    }

    @Test
    public void testDivide1() {
        Calculator calculate = new Calculator();
        // Assert that an ArithmeticException is thrown
        ArithmeticException exception = Assertions.assertThrows(ArithmeticException.class, () -> {
            calculate.Division(8.9, 0);
        });
        Assertions.assertEquals("/ by zero", exception.getMessage());
    }

    @Test
    public void testDivide2() {
        Calculator calculate = new Calculator();
        double result = calculate.Division(27, 4);
        assertEquals(6.75, result);
    }

}