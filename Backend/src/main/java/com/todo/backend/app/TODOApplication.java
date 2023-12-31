package com.todo.backend.app;

import com.todo.backend.config.TODOConfiguration;
import com.todo.backend.dao.TaskEntityDAO;
import com.todo.backend.entity.TaskEntity;
import com.todo.backend.resource.TODOResource;
import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.db.PooledDataSourceFactory;
import io.dropwizard.hibernate.HibernateBundle;

public class TODOApplication extends Application<TODOConfiguration> {
    private final HibernateBundle<TODOConfiguration> hibernateBundle = new HibernateBundle<TODOConfiguration>(TaskEntity.class) {
        @Override
        public PooledDataSourceFactory getDataSourceFactory(TODOConfiguration todoConfiguration) {
            return todoConfiguration.getDataSourceFactory();
        }
    };

    @Override
    public void initialize(Bootstrap<TODOConfiguration> bootstrap) {
        bootstrap.addBundle(hibernateBundle);
    }

    @Override
    public void run(TODOConfiguration todoConfiguration, Environment environment) throws Exception {
        TaskEntityDAO taskEntityDAO = new TaskEntityDAO(hibernateBundle.getSessionFactory());
        environment.jersey().register(new TODOResource(taskEntityDAO));
    }

    public static void main(String[] args) throws Exception {
        new TODOApplication().run(args);
    }
}
