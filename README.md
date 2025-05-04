# 🚀 TrackZone - Gestão de Motos em Pátios

**TrackZone** é uma API REST desenvolvida em Java com Spring Boot para auxiliar no gerenciamento de motos em pátios de filiais. A solução foi pensada para facilitar o controle de check-in, check-out, status, localização e histórico das motos, oferecendo também uma visualização inteligente e otimizada do pátio.

---

## 🧱 Tecnologias Utilizadas

- Java 17+
- Spring Boot 3+
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Cache
- Bean Validation (Jakarta)
- H2 Database
- Swagger/OpenAPI (Springdoc)
- Maven

---

## 🧩 Funcionalidades

- ✅ Login e cadastro de filial
- ✅ Cadastro de motos com informações detalhadas
- ✅ Check-in e check-out de motos
- ✅ Atualização de status da moto (em manutenção, pronta para alugar, etc.)
- ✅ Página inicial com resumo da operação (dashboard)
- ✅ Mapa do pátio com localização por plano cartesiano
- ✅ Filtros por status, placa e data
- ✅ Paginação e ordenação dos resultados
- ✅ Documentação automática com Swagger
- ✅ Cache para otimizar requisições
- ✅ Boas práticas REST e tratamento centralizado de erros

---

## 🔒 Acesso e Segurança

- A API utiliza **Spring Security** com autenticação básica (`HTTP Basic Auth`)
- Usuário padrão:  
  - **Login:** `admin`  
  - **Senha:** `1234`

---

## 📑 Documentação da API

Acesse a documentação interativa:

🔗 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)  
ou  
🔗 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## ▶️ Como Executar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/SeuUsuario/trackzone.git
   cd trackzone
   
2. Abra no Eclipse ou IntelliJ com suporte a Maven.

3. Execute a classe principal:
```
  JavaApplication.java
```
4. Acesse o Swagger ou utilize ferramentas como Postman.

---

## 🗃️ Banco de Dados

- Utiliza banco em memória H2 para facilitar os testes.
- Acesse o console do H2:
```
  http://localhost:8080/h2-console
```
- JDBC URL: jdbc:h2:mem:testdb
- Usuário: sa
- Senha: (deixe em branco)

---

## 📁 Estrutura de Pacotes
```
  trackzone/
  ├── config/
  ├── control/
  ├── dto/
  ├── exception/
  ├── model/
  ├── projection/
  ├── repository/
  ├── security/
  ├── service/
  ├── swagger/

```

---

## 📄 Endpoints principais

```
| Método | Endpoint               | Descrição                                |
| ------ | ---------------------- | ---------------------------------------- |
| GET    | /motos/todas           | Lista todas as motos (com cache)         |
| GET    | /motos/paginadas       | Lista paginada de motos                  |
| GET    | /motos/status?status=X | Filtra motos por status                  |
| POST   | /motos/inserir         | Cadastra nova moto                       |
| PUT    | /motos/atualizar/{id}  | Atualiza moto por ID                     |
| DELETE | /motos/remover/{id}    | Remove moto por ID                       |
| GET    | /filiais               | Lista todas as filiais (se implementado) |

```
- |⚠️ Todos os endpoints (exceto públicos) requerem autenticação básica.

---

## 📌 Observações

- Projeto desenvolvido para o Challenge da FIAP.
- Foco em boas práticas REST, separação por camadas, documentação e validação.
- Swagger e console H2 facilitam testes rápidos e visualização da estrutura da aplicação.

---

## 📄 Licença
- Projeto acadêmico para uso em contexto educacional, todos os direitos reservados.
- © 2025 – Leticia Cristina Dos Santos Passos

## 👥 Desenvolvedores

- Leticia Cristina Dos Santos Passos RM: 555241
- André Rogério Vieira Pavanela Altobelli Antunes RM: 554764
- Enrico Figueiredo Del Guerra RM: 558604








