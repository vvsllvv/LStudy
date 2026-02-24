package com.lms.course_service.service;

import com.lms.course_service.dto.ParagraphDto;
import com.lms.course_service.entity.Paragraph;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.ParagraphMapper;
import com.lms.course_service.repository.ParagraphRepository;
import com.lms.course_service.repository.ThemeRepository;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ParagraphService extends CustomService<Paragraph, ParagraphDto> {

    private final ParagraphRepository paragraphRepository;
    private final ParagraphMapper paragraphMapper;
    private final ThemeRepository themeRepository;

    public ParagraphService(ParagraphRepository paragraphRepository, ParagraphMapper paragraphMapper,
                            ThemeRepository themeRepository) {
        this.paragraphRepository = paragraphRepository;
        this.paragraphMapper = paragraphMapper;
        this.themeRepository = themeRepository;
        super(paragraphRepository, paragraphMapper);
    }

    public void create(Long id, ParagraphDto paragraphDto) {
        Paragraph paragraph = Paragraph.builder()
                .title(paragraphDto.title())
                .content(paragraphDto.content())
                .theme(themeRepository.findById(id).orElseThrow(() -> new NotFoundException("Object not found.")))
                .build();

        paragraphRepository.save(paragraph);
        log.info("Object is created.");
    }

    @Override
    public void update(Long id, ParagraphDto paragraphDto) {
        Paragraph paragraph = paragraphRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Object not found."));

        if (paragraphDto.title() != null)
            paragraph.setTitle(paragraphDto.title());

        if (paragraphDto.content() != null)
            paragraph.setContent(paragraphDto.content());

        paragraphRepository.save(paragraph);
        log.info("Paragraph is updated.");
    }

    public List<ParagraphDto> readAllById(Long id) {
        List<Paragraph> allParagraph = paragraphRepository.findAllByThemeId(id);
        return paragraphMapper.toDto(allParagraph);
    }
}
