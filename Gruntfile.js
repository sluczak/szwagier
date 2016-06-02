module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mongoimport');

  // Default task(s).
  grunt.registerTask('default', ['mongoimport']);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mongoimport: {
      options: {
        db : 'test',
        host : 'localhost', //optional
        port: '27017', //optional
        stopOnError : false,  //optional
        collections : [
          {
            name : 'servicetypes',
            type : 'json',
            file : 'init/servicetypes.json',
            jsonArray : true,
            upsert : true,
            drop : true
          },
          {
            name : 'servicestatuses',
            type :'json',
            file : 'init/servicestatuses.json',
            jsonArray : true,
            upsert : true,
            drop : true
          }
        ]
      }
    }
  });
};