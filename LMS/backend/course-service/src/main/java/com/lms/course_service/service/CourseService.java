package com.lms.course_service.service;

import com.lms.course_service.dto.CourseDto;
import com.lms.course_service.entity.Course;
import com.lms.course_service.entity.Module;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.CourseMapper;
import com.lms.course_service.mapper.ThemeMapper;
import com.lms.course_service.repository.CourseRepository;
import com.lms.course_service.repository.ModuleRepository;
import com.lms.course_service.repository.ThemeRepository;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CourseService extends CustomService<Course, CourseDto> {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final ModuleRepository moduleRepository;
    private final ThemeRepository themeRepository;
    private final ThemeMapper themeMapper;

    public CourseService(CourseMapper courseMapper, CourseRepository courseRepository,
                         ModuleRepository moduleRepository, ThemeRepository themeRepository, ThemeMapper themeMapper) {
        this.courseMapper = courseMapper;
        this.courseRepository = courseRepository;
        this.moduleRepository = moduleRepository;
        this.themeRepository = themeRepository;
        this.themeMapper = themeMapper;
        super(courseRepository, courseMapper);
    }


    public void create(Long id, CourseDto courseDto) {
        Module module = moduleRepository.findById(id).orElseThrow(() -> new NotFoundException("Object not found."));

        Course course = Course.builder()
                .title(courseDto.title())
                .module(module)
                .build();

        courseRepository.save(course);
    }

    @Override
    public void update(Long id, CourseDto courseDto) {
        Course course = courseMapper.toEntity(courseDto);

        if (courseDto.title() != null)
            course.setTitle(courseDto.title());

        log.info("Course is updated successfully.");
    }

    public List<CourseDto> readAllById(Long id) {
        List<Course> allCourses = courseRepository.findAllByModuleId(id);
        return courseMapper.toDto(allCourses);
    }
}




//    public List<ThemeDto> readAllChildren(Long id) {
//        Course course = courseRepository.findById(id).orElseThrow(() -> new NotFoundException("Object not found."));
//        List<ThemeDto> allThemes = course.getThemes().stream().map(t -> themeMapper.toDto(t)).toList();
//
//        return allThemes;
//    }