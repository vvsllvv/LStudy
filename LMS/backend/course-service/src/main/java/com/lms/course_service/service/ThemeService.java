package com.lms.course_service.service;

import com.lms.course_service.dto.ThemeDto;
import com.lms.course_service.entity.Theme;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.ThemeMapper;
import com.lms.course_service.repository.CourseRepository;
import com.lms.course_service.repository.ThemeRepository;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ThemeService extends CustomService<Theme, ThemeDto> {

    private final ThemeRepository themeRepository;
    private final ThemeMapper themeMapper;
    private final CourseRepository courseRepository;

    public ThemeService(ThemeRepository themeRepository, ThemeMapper themeMapper,
                        CourseRepository courseRepository) {
        this.themeMapper = themeMapper;
        this.themeRepository = themeRepository;
        this.courseRepository = courseRepository;
        super(themeRepository, themeMapper);
    }

    public void create(Long id, ThemeDto themeDto) {
        Theme theme = Theme.builder()
                .title(themeDto.title())
                .course(courseRepository.findById(id).orElseThrow(() -> new NotFoundException("Object not found.")))
                .build();

        themeRepository.save(theme);
        log.info("Theme is created.");
    }

    @Override
    public void update(Long id, ThemeDto themeDto) {
        Theme theme = themeMapper.toEntity(themeDto);

        if (themeDto.title() != null)
            theme.setTitle(themeDto.title());

        themeRepository.save(theme);
        log.info("Theme is updated.");
    }

    public List<ThemeDto> readAllById(Long id) {
        List<Theme> allThemes = themeRepository.findAll();
        return themeMapper.toDto(allThemes);
    }
}
