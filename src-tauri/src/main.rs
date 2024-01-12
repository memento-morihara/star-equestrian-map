// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    use tauri::Manager;
    use window_shadows::set_shadow;
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).expect("Unable to set window shadow");
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
