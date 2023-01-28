#工程java版本
FROM java:8
VOLUME /tmp
#将所有的jar包整合为app.jar
COPY *.jar /app.jar
#暴露后端端口号
EXPOSE 8888
#执行jar包
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","app.jar"]  
