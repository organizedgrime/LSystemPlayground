# LSystem Playground
The LSystem Playground uses the HTML5 canvas and dat.GUI controls to allow for the seamless and real time modification and creation of LSystems.

## Properties
1. Axiom - The starting "sentence" of the system
2. Constants - The set of characters that will move the turtle forwards and draw a line
3. Rules - A set of keys and values which are used in the iteration process. Any keys found in the existing sentence are replaced with the associated value, simultaneously for all rules
4. Angle - The degrees by which the turtle's state will change when rotating left or right
5. dhue - The amount by which the hue(in HSV) of the line changes every time a line is drawn
6. Iterations - The number of times the set of rules is applied to the axiom
7. Zoom - The size of the drawn system, which is in reality the size of individual line length
8. Rotation - The degrees by which the turtle is rotated before beginning the drawing process
