package com.todo.backend.dao;

import com.todo.backend.entity.TaskEntity;
import io.dropwizard.hibernate.AbstractDAO;
import jakarta.persistence.criteria.CriteriaQuery;
import org.hibernate.SessionFactory;

import java.util.List;

public class TaskEntityDAO extends AbstractDAO<TaskEntity> {
    public TaskEntityDAO(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public TaskEntity save(TaskEntity taskEntity) {
        return persist(taskEntity);
    }

    public List<TaskEntity> fetchAllTasks() {
        CriteriaQuery<TaskEntity> criteriaQuery = criteriaQuery();
        criteriaQuery.from(TaskEntity.class);
        return list(criteriaQuery);
    }

    public TaskEntity fetchTaskById(Long id) {
        return get(id);
    }

    public Boolean deleteTaskById(Long id) {
        TaskEntity taskEntity = fetchTaskById(id);

        if (taskEntity == null)
            return false;

        currentSession().remove(taskEntity);
        return true;
    }
}
