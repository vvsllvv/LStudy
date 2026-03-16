package com.lms.course_service.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lms.course_service.dto.CourseDto;
import com.lms.course_service.dto.ModuleDto;
import com.lms.course_service.service.ModuleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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

@ExtendWith(MockitoExtension.class)
public class ModuleControllerTest {

    @Mock
    private ModuleService moduleService;

    @Mock
    private ModuleController moduleController;
//
//    private MockMvc mockMvc;
//    private ObjectMapper objectMapper;
//
//    @BeforeEach
//    void setUp() {
//        mockMvc = MockMvcBuilders.standaloneSetup(moduleController).build();
//        objectMapper = new ObjectMapper();
//        Long moduleIdTest = 1L;
//        ModuleDto moduleDtoTest = new ModuleDto(moduleIdTest, "Общая информация", null);
//    }
//
//    @Test
//    void delete_Success_ReturnsOk() throws Exception {
//        Long id = 1L;
//        doNothing().when(moduleService).delete(id);
//
//        mockMvc.perform(delete("api/module/{id}/delete", id))
//                .andExpect(status().isOk())
//                .andExpect(content().string("The object is deleted."));
//
//        verify(moduleService, times(1)).delete(id);
//    }
//
//    @Test
//    void create_Success_ReturnsCreated() throws Exception {
//        ModuleDto newModuleDto = new ModuleDto(2L, "Тестовая информация", null);
//        doNothing().when(moduleService).create(any(ModuleDto.class));
//
//        mockMvc.perform(post("api/module/create")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(newModuleDto)))
//                .andExpect(status().isCreated());
//
//        verify(moduleService, times(1)).create(any(ModuleDto.class));
//    }
//
//    @Test
//    void readAll_EmptyList_ReturnsOkWithEmptyList() throws Exception {
//        when(moduleService.readAll()).thenReturn(Arrays.asList());
//
//        mockMvc.perform(get("/api/module/all"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
//                .andExpect(jsonPath("$").isArray())
//                .andExpect(jsonPath("$").isEmpty());
//
//        verify(moduleService, times(1)).readAll();
//    }

}
