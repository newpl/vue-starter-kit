# Nexfinance Starter Kit
 Nexfinance 관련 프로젝트를 빠르게 시작할 수 있는 Starter Kit 입니다.  
 
# Install
사내 GitHub repository에서 소스코드를 다운로드 받습니다.
```shell
$ git clone https://code.sdsdev.co.kr/dfp/nf-starterkit-front.git
```
이후 프로젝트 구동을 위한 dependency 설치를 진행합니다.
```shell
$ npm install 
```
다음 명령어를 실행하면 localhost:9091 의 주소에서 구동된 프로젝트를 확인할 수 있습니다.
```shell
$ npm run dev
```
# 배포
다음 명령어를 실행하면 dist 폴더에 나오는 파일들을 복사하여 nf-starterkit-backend 의 public/dist 에 붙여넣습니다.
```shell
$ npm run build
```