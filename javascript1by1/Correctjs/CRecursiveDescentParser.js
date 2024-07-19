class Parser {
    constructor(expression) {
        this.tokens = expression.match(/\d+|[+\-*/()]/g);
        this.current = 0;
    }

    parse() {
        return this.expression();
    }

    expression() {
        let node = this.term();
        while (this.match('+', '-')) {
            const operator = this.previous();
            const right = this.term();
            node = { type: 'BinaryExpression', operator, left: node, right };
        }
        return node;
    }

    term() {
        let node = this.factor();
        while (this.match('*', '/')) {
            const operator = this.previous();
            const right = this.factor();
            node = { type: 'BinaryExpression', operator, left: node, right };
        }
        return node;
    }

    factor() {
        if (this.match('(')) {
            const expr = this.expression();
            this.consume(')');
            return expr;
        }
        if (this.match(/\d+/)) {
            return { type: 'Literal', value: Number(this.previous()) };
        }
        throw new Error(`Unexpected token: ${this.peek()}`);
    }

    match(...expected) {
        if (this.check(...expected)) {
            this.advance();
            return true;
        }
        return false;
    }

    check(...expected) {
        if (this.isAtEnd()) return false;
        return expected.some(exp => exp === this.peek() || (exp instanceof RegExp && exp.test(this.peek())));
    }

    advance() {
        if (!this.isAtEnd()) this.current++;
    }

    consume(expected) {
        if (this.check(expected)) {
            this.advance();
            return;
        }
        throw new Error(`Expected ${expected} but found ${this.peek()}`);
    }

    previous() {
        return this.tokens[this.current - 1];
    }

    peek() {
        return this.tokens[this.current];
    }

    isAtEnd() {
        return this.current >= this.tokens.length;
    }
}

// Usage example
const parser = new Parser('3 + 5 * (10 - 2)');
const ast = parser.parse();
console.log(JSON.stringify(ast, null, 2));
