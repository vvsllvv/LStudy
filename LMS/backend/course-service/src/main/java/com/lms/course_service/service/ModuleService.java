package com.lms.course_service.service;

import com.lms.course_service.dto.ModuleDto;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.CourseMapper;
import com.lms.course_service.mapper.ModuleMapper;
import com.lms.course_service.repository.ModuleRepository;
import com.lms.course_service.service.base.CustomService;
import com.lms.course_service.entity.Module;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ModuleService extends CustomService<Module, ModuleDto> {

    private final ModuleRepository moduleRepository;
    private final ModuleMapper moduleMapper;
    private final CourseMapper courseMapper;

    public ModuleService(ModuleRepository moduleRepository, ModuleMapper moduleMapper, CourseMapper courseMapper) {
        super(moduleRepository, moduleMapper);
        this.courseMapper = courseMapper;
        this.moduleRepository = moduleRepository;
        this.moduleMapper = moduleMapper;
    }

    @Override
    public void update(Long id, ModuleDto moduleDto) {
        Module module = moduleRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Object not found."));

        if (moduleDto.title() != null)
            module.setTitle(moduleDto.title());

        moduleRepository.save(module);
        log.info("Module is updated successfully.");
    }
}
