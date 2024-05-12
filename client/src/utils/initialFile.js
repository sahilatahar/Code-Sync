import { v4 as uuidv4 } from "uuid"

const initialCode = `function sayHi() {
  console.log("👋 Hello world");
}

sayHi()`

const initialFile = {
    id: uuidv4(),
    name: "index.js",
    content: initialCode,
}

export default initialFile
