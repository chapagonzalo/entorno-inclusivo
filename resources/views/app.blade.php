<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="author" content="Aguilar Luciano Ivan">
        <meta name="developer" content="@lucianoAguilarWD">
        <meta name="contact" content="lucianoaguilarwebdev@gmail.com">
        <meta name="creator" content="Aguilar Luciano Ivan - https://github.com/@lucianoAguilarWD">
        <!-- Logo como Favicon -->
        <link rel="icon" href="{{ asset('Logo.svg') }}" type="image/svg+xml">

        <title >Entorno Inclusivo</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased" style="font-size: 1.25rem;">
        @inertia
    </body>
</html>
