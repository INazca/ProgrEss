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
}`,
    codeString3 = `public class Example {
    private boolean isSth;

    public Example(boolean isSth) {
        this.isSth = isSth;
    }

    private void setIsSth(boolean isSth) {

    }
}`,
    evaluationCode1 = `public class Example {
    private boolean isSth;

    public Example(boolean isSth) {
        this.isSth = isSth;
    }

    private void setIsSth(boolean isSth) {
        this.isSth = isSth;
    }
}`,
    evaluationCode2 = `public class Example {
    private boolean isSth;

    public Example(boolean isSth) {
        this.isSth = isSth;
    }

    private void setIsSth(boolean isSth) {
        return isSth;
    }
}`;

const Examples = {
    syntax: {
        task: "Eine Syntax-Highlighting-Aufgabe mit Dummy-Anweisung!",
        code: codeString1,
        highlights: [
            {
                list: [{
                    anchor: { line: 2, ch: 4 },
                    head: { line: 2, ch: 25 },
                },
                {
                    anchor: { line: 5, ch: 8 },
                    head: { line: 5, ch: 33 },
                },
                ],
                editor: "12",
            },
            {
                list: [{
                    anchor: { line: 4, ch: 4 },
                    head: { line: 4, ch: 10 },
                },
                {
                    anchor: { line: 5, ch: 8 },
                    head: { line: 5, ch: 33 },
                },
                ],
                editor: "29",
            },
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
        evaluations: [
            {type: "Object", editor: "14"}, 
            {type: "String", editor: "31"}
        ],
        expression: "this.isSth == isSth",
        histogramm: [
            {
                group: "boolean",
                correct: 15,
                rest: 5,
            },
            {
                group: "String",
                correct: 3,
                rest: 5,
            },
            {
                group: "Object",
                correct: 5,
                rest: 6,
            },
        ],
        solution: "boolean",
    },
    microtask: {
        task: "Implementieren Sie die Methode setIsSth(boolean isSth)!",
        code: codeString3,
        evaluations: [{code: evaluationCode1, editor: "5"}, {code: evaluationCode2, editor: "13"}],
        discussionSolutions: [{code: evaluationCode1, percentage: 81}, {code: evaluationCode2, percentage: 47}],
        solution: evaluationCode1,
    },
};

export default Examples;