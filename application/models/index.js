const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo db...');
});

// Schemas / Model
const todoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  task: String,
  complete: Boolean
});

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: String,
  email: String,
  todos: [todoSchema]
});

const User = mongoose.model('user', userSchema);

// Methods
module.exports.saveTodo = async (id, name, email, todo) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    new User({
      _id: id,
      name,
      email,
      todos: [todo]
    }).save();
  } else {
    const todoExists = await user.todos.id(todo._id);
    if (!todoExists) {
      user.todos.push(todo);
      user.save();
    }
  }
};

module.exports.getUserTodos = async userId => {
  return await User.findOne({ _id: userId }).select('todos -_id');
};

module.exports.deleteTodo = async (userId, todoId) => {
  const user = await User.findOne({ _id: userId }).exec();
  user.todos = user.todos.filter(todo => todo.id !== todoId);
  return user.save();
};

module.exports.findTodo = () => {
  return User.find();
};
