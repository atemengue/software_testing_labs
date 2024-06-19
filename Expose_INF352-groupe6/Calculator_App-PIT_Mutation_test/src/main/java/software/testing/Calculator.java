package software.testing;

import static java.lang.Double.NaN;

public class Calculator {

    public double Add(double a, double b){
        return a + b;
    }

    public double Subtract(double a, double b){
        return a - b;
    }

    public double Multiply(double a, double b){
        return  a * b;
   }

    public double Division(double a, double b){
        if (b == 0) {
            throw new ArithmeticException("/ by zero");
        }
        return a / b;
  }

}


