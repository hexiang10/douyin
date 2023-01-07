package com.douyin.common.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * SpringDoc API文档说明
 * 用ApiFox的话，可以不配置
 *
 * @author hexiang
 */

@Configuration
public class SpringDocConfig {
    @Bean
    public OpenAPI mallTinyOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Douyin-Cloud API")
                        .description("Douyin-Cloud API 演示")
                        .version("v1.0.0")
                        .license(new License().name("Apache 2.0").url("https://github.com/he-xiang-best")))
                .externalDocs(new ExternalDocumentation()
                        .description("基于微服务的短视频社交平台的设计与开发")
                        .url("https://github.com/he-xiang-best"));
    }

}