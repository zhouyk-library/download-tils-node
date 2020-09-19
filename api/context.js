const context = {}
context.data = {}

context.set = function(key,value){
    this.data[key] = value
}

context.get = function(key){
    return this.data[key]
}

context.del = function(key){
    delete this.data[key]
}

module.exports = context