package com.lms.api_gateway.filter;

import com.lms.api_gateway.exception.AuthenticationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@Slf4j
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    @Autowired
    private RouteValidator validator;

    @Autowired
    private RestTemplate template;

    public AuthenticationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (validator.isSecured.test(exchange.getRequest())) {
                if (!exchange.getRequest().getHeaders().containsHeader(HttpHeaders.AUTHORIZATION)) {
                    log.info("User is not authorized.");
                    throw new AuthenticationException("Missing authorization header.");
                }

                String token = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);

                try {
<<<<<<< HEAD
                    template.getForObject("http://localhost:8081/api/auth/validate?token=x" + token, String.class);
=======
                    template.getForObject("http://localhost:8081/api/auth/validate?token=" + token, String.class);
>>>>>>> e05764a8297ba1dfd94ebaa117e7aed2e3e0b2d1

                } catch (Exception e) {
                    System.out.println("Invalid access.");
                    throw new RuntimeException("Unauthorized access to application.");
                }
            }
            return chain.filter(exchange);
        });
    }

    public static class Config {

    }
}

