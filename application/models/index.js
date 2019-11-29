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
  id: { type: String, required: true },
  task: String,
  complete: Boolean
});

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: String,
  email: String,
  todos: [todoSchema]
});

const User = mongoose.model('user', userSchema);

// Methods
module.exports.saveTodo = async (id, name, email, todo) => {
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return await new User({
        id,
        name,
        email,
        todos: [todo]
      }).save();
    } else {
      const todoExists = user.todos.some(obj => obj.id === todo.id);
      if (!todoExists) {
        user.todos.push(todo);
        return await user.save();
      }
    }
  } catch (err) {
    return err;
  }
};

module.exports.getUserTodos = async userId => {
  return await User.findOne({ id: userId }).select('todos -_id');
};

module.exports.deleteTodo = async (userId, todoId) => {
  const user = await User.findOne({ id: userId }).exec();
  user.todos = user.todos.filter(todo => todo.id !== todoId);
  return user.save();
};

module.exports.completeTodo = async (userId, todoId) => {
  const user = await User.findOne({ id: userId }).exec();
  user.todos.forEach(todo => {
    if (todo.id === todoId) {
      todo.complete = !todo.complete;
    }
  });
  return user.save();
};

module.exports.getAll = async () => {
  return await User.find({}).exec();
};
