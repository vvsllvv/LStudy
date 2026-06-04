package com.lms.course_service.controller;

import com.lms.course_service.controller.base.CustomController;
import com.lms.course_service.dto.AttemptDto;
import com.lms.course_service.dto.TestDto;
import com.lms.course_service.entity.Test;
import com.lms.course_service.service.TestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test/")
@Slf4j
public class TestController extends CustomController<Test, TestDto> {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
        super(testService);
    }

    @PostMapping("{id}/attempt")
    public ResponseEntity<?> confirmAttempt(@PathVariable("id") Long id,
                                            @RequestBody AttemptDto attemptDto) {
        try {
            testService.confirmAttempt(id, attemptDto);
            return ResponseEntity.status(HttpStatus.OK).body("Attempt confirmed.");
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong.");
        }
    }

}
