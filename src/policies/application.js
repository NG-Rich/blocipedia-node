module.exports = class ApplicationPolicy {
  constructor(user, record) {
    this.user = user;
    this.record = record;
  }

  _isOwner() {
    return this.record && (this.record.userId == this.user.id);
  }

  _isAdmin() {
    return this.user && this.user.role == "admin";
  }

  _isPremium() {
    return this.user && this.user.role == "premium";
  }

  new() {
    return this.user != null;
  }

  create() {
    return this.new();
  }

  show() {
    return true;
  }

  edit() {
    return this.record &&
      (this._isOwner() || this._isAdmin() || this.new());
  }

  update() {
    return this.edit();
  }

  destroy() {
    return this.update();
  }
}
