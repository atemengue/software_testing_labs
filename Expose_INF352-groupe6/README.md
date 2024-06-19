## Calculator Application

This is a simple Calculator application implemented in Java. It includes basic arithmetic operations such as addition, subtraction, multiplication, and division. The project is set up for unit testing with JUnit 5 and mutation testing with PIT (PITest). At the end of the unit testing and mutation analysis, report directories (JUnit-htmlReport and PIT-targetReport) are generated for both giving a brief analysis of the code coverage. Let's remember that mutation testing is there to test the effectiveness of the unit testing that was predominantly done.

## Contributors

-   Liomo Simeu Naomi 21T2268
-   Ntabet Salomon Pierre 21T2582 (Team manager)
-   Tiagou Azambou Yollande 21T2523

## Prerequisites

-   **Java Development Kit (JDK)**: Ensure you have JDK installed on your machine. This project uses JDK 22.
-   **IntelliJ IDEA**: This project is developed using IntelliJ IDEA Community Edition.

## Installation

### Java and JDK

1.  Download and install the lastest JDK from the  [Oracle JDK Download](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)  page.
    
2.  Verify the installation by running the following command in your terminal or command prompt:
```sh
java -version
```

### IntelliJ IDEA

1.  Download and install IntelliJ IDEA Community Edition from the  [JetBrains website](https://www.jetbrains.com/idea/download/).
2.  Follow the installation instructions for your operating system.
### Setting Up the Project

1.  Open IntelliJ IDEA.
2.  Clone the project repository or create a new project:
    -   To clone a repository, go to  `File > New > Project from Version Control`, and enter the repository URL.
    -   To create a new project, go to  `File > New > Project`, and follow the prompts to create a new Java project.
3.  Import the project into IntelliJ IDEA.
### Installing JUnit 5

1.  Open your project in IntelliJ IDEA.
    
2.  Open the  `pom.xml`  file and add the following dependencies for JUnit 5:
```
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-api</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
```
3.  Refresh the Maven project to download the dependencies.
    

### Installing and Configuring PIT

1.  Add the PIT Maven plugin to your  `pom.xml`:
```
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.16.1</version>
    <executions>
        <execution>
            <id>pitest</id>
            <goals>
                <goal>mutationCoverage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
2. Configure PIT to target your classes and tests. Add the following configuration within the `<plugin>` tags:
```
<configuration>
    <targetClasses>
        <param>software.testing.*</param>
    </targetClasses>
    <targetTests>
        <param>software.testing.*</param>
    </targetTests>
</configuration>
```
3. Refresh the Maven project to apply the plugin configuration.
## Project Structure

The project has the following structure:
Calculator/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── software/
│   │           └── testing/
│   │               └── Calculator.java
│   ├── test/
│       └── java/
│           └── software/
│               └── testing/
│                   └── CalculatorTest.java
├── pom.xml

## Contributing

We welcome contributions to the project! To contribute, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bugfix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your forked repository.
5.  Create a pull request to the main repository.

Please ensure your code adheres to the project’s coding standards and includes appropriate tests.

## License

This project is licensed under the GNU General Public License (GPL). See the LICENSE file for details.

## Acknowledgements

-   [pitest](https://pitest.org)  for providing a fast and efficient testing framework.
-   [intellij idea](https://www.jetbrains.com/idea/) for a great development experience.
-   Kimbi Xaveria, PhD university of Yaounde I, course lecturer.
-   Regis Atemengue, course instructor.
-   All group members who have contributed to this unit testing project.

Thank you for using our project! We hope it helps you ensure the reliability and correctness of your mutation test in java.










