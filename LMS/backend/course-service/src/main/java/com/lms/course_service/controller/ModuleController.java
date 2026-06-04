package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.ModuleDto;
import com.lms.course_service.entity.Module;
import com.lms.course_service.service.ModuleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/module/")
public class ModuleController extends CustomController<Module, ModuleDto> {

    private final ModuleService moduleService;

    protected ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
        super(moduleService);
    }

}
