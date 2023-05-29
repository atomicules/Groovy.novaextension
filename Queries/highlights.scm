; This is hitting all the package, class, def stuff:
(unit
  (identifier) @identifier.variable)
(string
  (identifier) @identifier.variable)

(escape_sequence) @string.escape

(block
  (unit
    (identifier) @declaration
  )
)

(func
  (identifier) @identifier.function
)

(number) @value.number

((identifier) @value.boolean
  (#any-of? @value.boolean "true" "false" "True" "False"))

((identifier) @identifier.constant
  (#lua-match? @identifier.constant "^[A-Z][A-Z%d_]*$"))

((identifier) @type.definition
  (#any-of? @type.definition
    "string"
    "String"
    "void"
    "id"
    "version"
    "apply")
)

((identifier) @keyword.construct
  (#any-of? @keyword.construct
    "static"
    "class"
    "def"
    "import"
    "new"
    "package"
))

(string) @string

(line_comment) @comment
(block_comment) @comment

(operators) @operator
(leading_key) @operator

["(" ")" "[" "]" "{" "}"]  @bracket
