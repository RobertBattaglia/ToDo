const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to mongo db...');
});

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
      console.log(user);
      user.todos.push(todo);
      console.log(user);
      user.save();
    }
  }
};

module.exports.getUserTodos = async userId => {
  return await User.findOne({ _id: userId }).select('todos -_id');
};

module.exports.delete = () => {
  return User.findOneAndDelete({ _id: '10219071906341489' }).exec();
};

module.exports.findTodo = () => {
  return User.find();
};
