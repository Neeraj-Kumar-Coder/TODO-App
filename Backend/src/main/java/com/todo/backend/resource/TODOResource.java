package com.todo.backend.resource;

import com.todo.backend.dao.TaskEntityDAO;
import com.todo.backend.entity.TaskEntity;
import io.dropwizard.hibernate.UnitOfWork;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.todo.backend.enums.StatusTypes;

import java.util.Date;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
public class TODOResource {
    private final TaskEntityDAO taskEntityDAO;

    public TODOResource(TaskEntityDAO taskEntityDAO) {
        this.taskEntityDAO = taskEntityDAO;
    }

    @GET
    @Path("/health_check")
    public String healthCheck() {
        return "Ping received at " + new Date();
    }

    @POST
    @Path("/create_task")
    @UnitOfWork
    public Response create(@Valid TaskEntity taskEntity) {
        taskEntity.setStatus(StatusTypes.TODO);
        return Response.ok().entity(taskEntityDAO.save(taskEntity)).build();
    }

    @GET
    @Path("/fetch_all_tasks")
    @UnitOfWork
    public Response fetchAllTasks() {
        return Response.ok().entity(taskEntityDAO.fetchAllTasks()).build();
    }

    @GET
    @Path("/fetch_task")
    @UnitOfWork
    public Response fetchTask(@QueryParam("id") Long id) {
        return Response.ok().entity(taskEntityDAO.fetchTaskById(id)).build();
    }

    @PUT
    @Path("/update_task/{id}")
    @UnitOfWork
    public TaskEntity updateTask(@PathParam("id") Long taskId, @Valid TaskEntity updatedTask) {
        TaskEntity existingTask = taskEntityDAO.fetchTaskById(taskId);

        if (existingTask != null) {
            if (updatedTask.getTitle() != null) {
                existingTask.setTitle(updatedTask.getTitle());
            }
            if (updatedTask.getDescription() != null) {
                existingTask.setDescription(updatedTask.getDescription());
            }
            if (updatedTask.getStartDate() != null) {
                existingTask.setStartDate(updatedTask.getStartDate());
            }
            if (updatedTask.getEndDate() != null) {
                existingTask.setEndDate(updatedTask.getEndDate());
            }
            if (updatedTask.getStatus() != null) {
                existingTask.setStatus(updatedTask.getStatus());
            }

            return taskEntityDAO.save(existingTask);
        } else {
            throw new NotFoundException("Task with ID " + taskId + " not found");
        }
    }

    @DELETE
    @Path("/delete_task/{id}")
    @UnitOfWork
    public Response deleteTaskById(@PathParam("id") Long id) {
        return Response.ok().entity(taskEntityDAO.deleteTaskById(id)).build();
    }
}
