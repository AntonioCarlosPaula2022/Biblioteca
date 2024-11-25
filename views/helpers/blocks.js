module.exports = {
    block: function(name) {
        var blocks = this._blocks;
        var content = blocks && blocks[name];
        return content ? content.join('\n') : null;
    },
    contentFor: function(name, options) {
        var blocks = this._blocks || (this._blocks = {});
        var block = blocks[name] || (blocks[name] = []);
        block.push(options.fn(this));
    }
};
