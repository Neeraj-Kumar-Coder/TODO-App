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
import jakarta.servlet.DispatcherType;
import jakarta.servlet.FilterRegistration;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import java.util.EnumSet;

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
        // Enable CORS headers
        final FilterRegistration.Dynamic cors =
                environment.servlets().addFilter("CORS", CrossOriginFilter.class);

        // Configure CORS parameters
        cors.setInitParameter("allowedOrigins", "*");
        cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
        cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

        // Add URL mapping
        cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

        TaskEntityDAO taskEntityDAO = new TaskEntityDAO(hibernateBundle.getSessionFactory());
        environment.jersey().register(new TODOResource(taskEntityDAO));
    }

    public static void main(String[] args) throws Exception {
        new TODOApplication().run(args);
    }
}
