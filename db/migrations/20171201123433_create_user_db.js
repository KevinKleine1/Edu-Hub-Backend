
      exports.up = function(knex, Promise) {
          return knex.schema
      .createTable('School', function(table){
          table.increments('schoolid').primary();
          table.timestamp('school_created_at').defaultTo(knex.fn.now());
          table.timestamp('school_updated_at').defaultTo(knex.fn.now());
          table.string('school_name');
          table.string('school_street');
          table.integer('school_number');
          table.integer('school_postcode');
          table.string('school_city');
          table.integer('school_studentnumber');
       })
      .createTable('User', function(table){
            table.increments('userid').primary();
            table.string('email');
            table.string('forename');
            table.string('surname');
            table.string('user_description',1000).defaultTo("Hier könnte etwas über dich stehen.")
          //Adresse
            table.string('street');
            table.string('city');
            table.integer('number');
            table.integer('postcode');
            //Funktion und Fächer in der Schule
            table.integer('user_schoolid')
            table.string('function');
            table.string('subject1');
            table.string('subject2');
            table.string('subject3');
            table.string('interests1');
            table.string('interests2');
            table.string('interests3');
            table.string('profilpic');
            table.integer('user_karma');
            table.timestamp('user_created_at').defaultTo(knex.fn.now());
            table.timestamp('user_updated_at').defaultTo(knex.fn.now());

            table.boolean('user_privacy').defaultTo(false);
         })
      .createTable('Project', function(table){
          table.increments('projectid').primary();
          table.string('project_name');
          table.string('project_text', 4000);
          table.integer('project_karma').defaultTo(0);
          table.string('project_projecttype');
          table.integer('project_author');
          table.string('project_activity');
          table.string('project_statement', 4000);
          table.string('project_imagepath');
          table.integer('project_writeRights').defaultTo(0);
          table.integer('project_membercount').defaultTo(1);
          table.integer('project_favcount').defaultTo(0);
          table.string('project_termin');
          table.string('project_change', 4000);
          table.integer('Project_projectid').unsigned().references('projectid').inTable('Project').onDelete('CASCADE');
          table.timestamp('project_created_at').defaultTo(knex.fn.now());
          table.timestamp('project_updated_at').defaultTo(knex.fn.now());
        })
      .createTable('UserHasProject', function(table){
          table.increments('userhasprojectid').primary();
          table.integer('uhp_iduser').unsigned().references('userid').inTable('User').onDelete('CASCADE');
          table.integer('uhp_idproject').unsigned().references('projectid').inTable('Project').onDelete('CASCADE');
          table.string('uhp_userrole');
        })
      .createTable('Tag', function(table){
          table.increments('tagid').primary();
          table.string('tag_name');
        })
      .createTable('ProjectHasTag', function(table){
          table.increments('projecthastagid').primary();
          table.integer('pht_idtag').unsigned().references('tagid').inTable('Tag').onDelete('CASCADE');
          table.integer('pht_idproject').unsigned().references('projectid').inTable('Project').onDelete('CASCADE');
        })
      .createTable('Resource', function(table) {
          table.increments('resourceid').primary();
          table.string('resource_name');
        })
      .createTable('ProjectHasResource', function(table){
          table.increments('projecthasresourceid').primary();
          table.integer('phr_idresource').unsigned().references('resourceid').inTable('Resource').onDelete('CASCADE');
          table.integer('phr_idproject').unsigned().references('projectid').inTable('Project').onDelete('CASCADE');
        })
      .createTable('Image', function(table){
          table.increments('imageid').primary();
          table.string('image_name');
          table.string('src', 500);
          table.string('thumbnail',500);
          table.integer('thumbnailWidth').defaultTo(320);
          table.integer('thumbnailHeight').defaultTo(212);          
          table.boolean('image_deleted').notNullable().defaultTo(false);
          table.integer('image_idproject').unsigned().references('projectid').inTable('Project').onDelete('CASCADE');
          
        })
      .createTable('Document', function(table){
          table.increments('documentid').primary();
          table.string('document_name');
          table.string('document_documentpath', 500);
          table.boolean('document_deleted').notNullable().defaultTo(false);
          table.integer('document_idproject').unsigned().references('projectid').inTable('Project').onDelete('CASCADE');
         
        })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('School').dropTable('User');
};
