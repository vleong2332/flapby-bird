var AssetManager = function() {
   this.fetchQueue = [];
   this.successCount = 0;
   this.failedCount = 0;
   this.cache = {};
};

AssetManager.prototype.queueAsset = function(path) {
   this.fetchQueue.push(path);
};

AssetManager.prototype.downloadAssets = function(callback) {
   if (this.fetchQueue.length === 0) { callback(); }
   for (var i = 0; i < this.fetchQueue.length; i++) {
      var path = this.fetchQueue[i];
      var img = new Image();
      var that = this;
      img.addEventListener('load', function() {
         that.successCount += 1;
         if (that.isDone()) { callback(); }
      }, false);
      img.addEventListener('error', function() {
         that.failedCount += 1;
         if (that.isDone()) { callback(); }
      }, false);
      img.src = path;
      this.cache[path] = img;
   }
};

AssetManager.prototype.isDone = function() {
   return (this.fetchQueue.length == this.successCount + this.failedCount);
};

AssetManager.prototype.getAsset = function(path) {
   return this.cache[path];
};

exports.AssetManager = AssetManager;