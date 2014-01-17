function Todo(id, desc) {
  if (!desc) throw new Error('please enter a todo item');
  this.id = id;
  this.desc = desc;
  this.status = 'pending';
}

Todo.create = function(attrs) {
  return new Todo(attrs.id, attrs.desc);
};

Todo.prototype.undo = function() {
  this.status = 'pending';
};

Todo.prototype.complete = function() {
  this.status = 'done';
};

module.exports = Todo;
