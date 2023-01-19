import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.douyin.framework.base.BaseEntity;

import java.util.*;

/**
 * @ClassName CodeGenerator
 * @description: 代码生成器
 */

public class CodeGenerator {

    // TODO 项目名称
    private static final String PROJECT_NAME = "douyin";
    // TODO 服务名称
    private static final String SERVER_NAME = "vlog";
  	// TODO 数据库地址
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/douyin_cloud?useUnicode=true&characterEncoding =UTF-8&serverTimezone = Asia/Shanghai";
	// TODO 数据库用户名
    private static final String USERNAME = "root";
	// TODO 数据库密码
    private static final String PASSWORD = "root";
	// TODO 作者
    private static final String AUTHOR = "hexiang";
	// TODO 去除的表前缀（可选）
    private static final String FieldPrefix = "dy";
	// TODO 模板路径（可选）
    private static final String TEMPLATE_PATH = "/templates/entity.java";

    /**
     * 项目路径配置
     */
    private static final String PARENT_DIR = System.getProperty("user.dir");
    private static final String CLOUD_NAME = PROJECT_NAME+"-service/"+PROJECT_NAME+"-"+SERVER_NAME+"-server";
    private static final String PACKAGE_DIR = "/com/"+PROJECT_NAME;
    private static final String MODEL_DIR = "/com/"+PROJECT_NAME+"/framework/domain";
    private static final String PACKAGE_EXE = "com."+PROJECT_NAME;

    /**
     * xml路径
     */
    private static final String XML_PATH = PARENT_DIR + "/"+CLOUD_NAME+"/src/main/resources/mapper/"+SERVER_NAME;
    /**
     * entity路径
     */
    private static final String ENTITY_PATH = PARENT_DIR +"/"+PROJECT_NAME+"-framework/src/main/java"+MODEL_DIR+"/"+SERVER_NAME;
    /**
     * mapper（Dao）路径
     */
    private static final String MAPPER_PATH = PARENT_DIR +"/"+CLOUD_NAME+"/src/main/java"+PACKAGE_DIR+"/mapper/"+SERVER_NAME;
    /**
     * service路径
     */
    //private static final String SERVICE_PATH = PARENT_DIR +"/"+CLOUD_NAME+"/src/main/java"+PACKAGE_DIR+"/service/"+SERVER_NAME;
    private static final String SERVICE_PATH = PARENT_DIR +"/"+PROJECT_NAME+"-service-api/src/main/java"+PACKAGE_DIR+"/service/"+SERVER_NAME;
    /**
     * serviceImpl路径
     */
    private static final String SERVICE_IMPL_PATH = PARENT_DIR +"/"+CLOUD_NAME+"/src/main/java"+PACKAGE_DIR+"/service/"+SERVER_NAME+"/impl/";
    /**
     * controller路径
     */
    private static final String CONTROLLER_PATH = PARENT_DIR +"/"+CLOUD_NAME+"/src/main/java"+PACKAGE_DIR+"/controller/"+SERVER_NAME;

    public static void main(String[] args) {
        FastAutoGenerator.create(URL, USERNAME, PASSWORD)
                // 全局配置
                .globalConfig(builder -> builder
                        // 设置作者
                        .author(AUTHOR)
                        // 开启swagger注解
                        //.enableSwagger() com.douyin.common.model
                        .disableOpenDir()
                )
                // 包配置
                .packageConfig(builder -> builder
                        .parent("")
                        .xml("mapper."+SERVER_NAME)
                        .entity(PACKAGE_EXE+".framework.domain."+SERVER_NAME)
                        .mapper(PACKAGE_EXE+".mapper."+SERVER_NAME)
                        .service(PACKAGE_EXE+".service."+SERVER_NAME)
                        .serviceImpl(PACKAGE_EXE+".service."+SERVER_NAME+".impl")
                        .controller(PACKAGE_EXE+".controller."+SERVER_NAME)
                        .pathInfo(getPathInfo())
                )
                // 策略配置
                .strategyConfig((scanner, builder) ->
                        builder.addInclude(getTables(scanner.apply("请输入表名，多个表之间用英文逗号分隔，所有输入all")))
                        .addTablePrefix(FieldPrefix)
                        // entity
                        .entityBuilder()
                        .fileOverride()
                        .enableChainModel()
                        .fileOverride()
                        .enableLombok() // 开启lombok
                        .enableTableFieldAnnotation()
                        .superClass(BaseEntity.class)
                        .addIgnoreColumns("created_time","updated_time")
                        //.logicDeleteColumnName("del_flag")
                        //.logicDeletePropertyName("delFlag")
                        //.idType(IdType.AUTO)
                        //.addTableFills(new Column("create_time", FieldFill.INSERT))
                        //.addTableFills(new Property("update_time", FieldFill.INSERT_UPDATE))
                        // controller
                        .controllerBuilder()
                        .fileOverride()
                        .enableRestStyle()
                        .formatFileName("%sController")
                        // service
                        .serviceBuilder()
                        .fileOverride()
                        .superServiceClass(IService.class)
                        .formatServiceFileName("%sService")
                        .formatServiceImplFileName("%sServiceImpl")
                        // mapper
                        .mapperBuilder()
                        .fileOverride()
                        .enableBaseResultMap()
                        .enableBaseColumnList()
                        .superClass(BaseMapper.class)
                        .formatMapperFileName("%sMapper")
                        .formatXmlFileName("%sMapper")
                        .enableMapperAnnotation()
                )
                // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .templateConfig(builder -> {
                    // 实体类使用我们自定义模板
                    builder.entity(TEMPLATE_PATH);
                })
                .templateEngine(new FreemarkerTemplateEngine())
                .execute();


    }
    /**
     * 获取路径信息map
     */
    private static Map<OutputFile, String> getPathInfo() {
        Map<OutputFile, String> pathInfo = new HashMap<>(5);
        pathInfo.put(OutputFile.entity, ENTITY_PATH);
        pathInfo.put(OutputFile.mapper, MAPPER_PATH);
        pathInfo.put(OutputFile.service, SERVICE_PATH);
        pathInfo.put(OutputFile.serviceImpl, SERVICE_IMPL_PATH);
        pathInfo.put(OutputFile.controller, CONTROLLER_PATH);
        pathInfo.put(OutputFile.xml, XML_PATH);
        return pathInfo;
    }

    // 处理 all 情况
    protected static List<String> getTables (String tables){
        return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
    }
}