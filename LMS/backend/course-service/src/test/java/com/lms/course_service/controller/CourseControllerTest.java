package com.lms.course_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.course_service.dto.CourseDto;
import com.lms.course_service.service.CourseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(MockitoExtension.class)
public class CourseControllerTest {

    @Mock
    private CourseService courseService;

    @InjectMocks
    private CourseController courseController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(courseController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void delete_Success_ReturnsOk() throws Exception {
        Long id = 1L;
        doNothing().when(courseService).delete(id);

        mockMvc.perform(delete("/api/course/{id}/delete", id))
                .andExpect(status().isOk())
                .andExpect(content().string("The object is deleted."));

        verify(courseService, times(1)).delete(id);
    }

    @Test
    void create_Success_ReturnsCreated() throws Exception {
        CourseDto courseDto = new CourseDto(2L, "Тестовый курс");
        doNothing().when(courseService).create(any(CourseDto.class));

        mockMvc.perform(post("/api/course/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(courseDto)))
                .andExpect(status().isCreated());

        verify(courseService, times(1)).create(any(CourseDto.class));
    }

    @Test
    void readAll_EmptyList_ReturnsOkWithEmptyList() throws Exception {
        when(courseService.readAll()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/course/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());

        verify(courseService, times(1)).readAll();
    }
}
