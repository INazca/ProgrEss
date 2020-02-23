/* eslint-env browser */
//this data will later be given by the survey with a corresponding JSON

var codeString1 = `public class Object {
    private static final int CONSTANT = 4;
    private int variable;
    
    public Object(int variable) {
        this.variable = variable;
    }
}`,
    codeString2 = `public class Example {
    private boolean isSth;

    public Example(boolean isSth) {
        this.isSth = isSth;

        if(this.isSth == isSth) {
            System.out.println("Example!");
        }
    }
}`;

const Examples = {
    syntax: {
        task: "Eine Syntax-Highlighting-Aufgabe mit Dummy-Anweisung!",
        code: codeString1,
        highlights: [
            [
                {
                    anchor: { line: 2, ch: 4 },
                    head: { line: 2, ch: 25 },
                },
                {
                    anchor: { line: 5, ch: 8 },
                    head: { line: 5, ch: 33 },
                },
            ],
            [
                {
                    anchor: { line: 4, ch: 4 },
                    head: { line: 4, ch: 10 },
                },
                {
                    anchor: { line: 5, ch: 8 },
                    head: { line: 5, ch: 33 },
                },
            ],
        ],
        heatmap: {
            light: [
                {
                    anchor: { line: 4, ch: 18 },
                    head: { line: 4, ch: 30 },
                },
            ],
            medium: [
                {
                    anchor: { line: 2, ch: 4 },
                    head: { line: 2, ch: 25 },
                },
            ],
            strong: [
                {
                    anchor: { line: 5, ch: 8 },
                    head: { line: 5, ch: 33 },
                },
            ],
        },
        solution: [
            {
                anchor: { line: 5, ch: 8 },
                head: { line: 5, ch: 33 },
            },
        ],
    },
    type: {
        code: codeString2,
        highlight: {
            anchor: { line: 6, ch: 11 },
            head: { line: 6, ch: 30 },
        },
        evaluations: ["Object", "String"],
    },
};

export default Examples;