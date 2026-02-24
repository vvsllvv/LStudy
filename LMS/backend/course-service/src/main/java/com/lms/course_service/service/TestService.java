package com.lms.course_service.service;

import com.lms.course_service.dto.TestDto;
import com.lms.course_service.entity.Question;
import com.lms.course_service.entity.Test;
import com.lms.course_service.exception.NotFoundException;
import com.lms.course_service.mapper.QuestionMapper;
import com.lms.course_service.mapper.TestMapper;
import com.lms.course_service.repository.TestRepository;
import com.lms.course_service.repository.ThemeRepository;
import com.lms.course_service.service.base.CustomService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TestService extends CustomService<Test, TestDto> {

    private final TestMapper testMapper;
    private final TestRepository testRepository;
    private final QuestionMapper questionMapper;
    private final ThemeRepository themeRepository;
    private final QuestionService questionService;
    private final AnswerService answerService;

    public TestService(TestRepository testRepository, TestMapper testMapper,
                       QuestionMapper questionMapper, ThemeRepository themeRepository,
                       QuestionService questionService, AnswerService answerService) {
        super(testRepository, testMapper);this.testRepository = testRepository;
        this.testMapper = testMapper;
        this.questionMapper = questionMapper;
        this.themeRepository = themeRepository;
        this.questionService = questionService;
        this.answerService = answerService;
    }

//    public void testCollector(Long id, TestDto testDto) {
//        create();
//    }

    public void create(Long id, TestDto testDto) {
        Test test = Test.builder()
                .title(testDto.title())
                .active(testDto.active())
                .timeout(testDto.timeout() * 60)
                .theme(themeRepository.findById(id).orElseThrow(() -> new NotFoundException("Object not found.")))
                .build();

        testRepository.save(test);

        Long testId = test.getId();

        testDto.questions().forEach(q -> questionService.create(testId, q));

        log.info("Test with id = {} is built.", id);
    }

    @Override
    public void update(Long ID, TestDto testDto) {
        Test test = testRepository.findById(ID)
                .orElseThrow(() -> new NotFoundException("Object not found."));

        if (testDto.title() != null)
            test.setTitle(testDto.title());

        if (testDto.active() != null)
            test.setActive(testDto.active());

        if (testDto.timeout() != null)
            test.setTimeout(testDto.timeout());

        if (testDto.questions() != null) {
            List<Question> newQuestions = questionMapper.toEntity(testDto.questions());
            test.getQuestions().addAll(newQuestions);
        }

        testRepository.save(test);
        log.info("Object is updated.");
    }

    public List<TestDto> readAllById(Long id) {
        List<Test> allTests = testRepository.findAllByThemeId(id);
        return testMapper.toDto(allTests);
    }
}
