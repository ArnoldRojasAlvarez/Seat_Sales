mod client;
mod server;
use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use actix_cors::Cors;
use serde::Serialize;
use server::SeatingStructure;


fn get_seating_structure() -> SeatingStructure {
    // Devuelve una estructura de asientos con la información necesaria.
    SeatingStructure::new()
}

async fn seating_structure_handler() -> impl Responder {
    let seating_structure = get_seating_structure();
    HttpResponse::Ok().json(seating_structure)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    /**
    // Ejecuta el servidor en un hilo separado
    std::thread::spawn(|| {
        server::start_server();
    });

    // Ejecuta el cliente en el hilo principal
    client::run_client();
    **/
    // Inicia el servidor HTTP de Actix en el puerto 7878
    HttpServer::new(|| {
        App::new()
            // Configura CORS para permitir conexiones desde React
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .route("/seating_structure", web::get().to(seating_structure_handler))
    })
        .bind("127.0.0.1:7878")?
        .run()
        .await
}



