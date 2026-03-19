package com.lms.course_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.course_service.dto.CourseDto;
import com.lms.course_service.dto.ThemeDto;
import com.lms.course_service.service.ThemeService;
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
public class ThemeControllerTest {

    @Mock
    private ThemeService themeService;

    @InjectMocks
    private ThemeController themeController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(themeController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void delete_Success_ReturnsOk() throws Exception {
        Long id = 1L;
        doNothing().when(themeService).delete(id);

        mockMvc.perform(delete("/api/theme/{id}/delete", id))
                .andExpect(status().isOk())
                .andExpect(content().string("The object is deleted."));

        verify(themeService, times(1)).delete(id);
    }

    @Test
    void create_Success_ReturnsCreated() throws Exception {
        ThemeDto courseDto = new ThemeDto(2L, "Тестовый курс", null, null, null);
        doNothing().when(themeService).create(any(ThemeDto.class));

        mockMvc.perform(post("/api/theme/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(courseDto)))
                .andExpect(status().isCreated());

        verify(themeService, times(1)).create(any(ThemeDto.class));
    }

    @Test
    void readAll_EmptyList_ReturnsOkWithEmptyList() throws Exception {
        when(themeService.readAll()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/theme/all"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());

        verify(themeService, times(1)).readAll();
    }
}
