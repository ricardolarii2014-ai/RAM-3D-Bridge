
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default {
  async fetch(request) {
    // Responde ao navegador quando ele verifica o CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    // Teste de funcionamento
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "RAM 3D Bridge",
          version: "1.0",
          message: "Ponte funcionando corretamente!"
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders
          }
        }
      );
    }

    // Recebe os dados do gerador 3D
    if (request.method === "POST") {
      try {
        const data = await request.json();

        const projeto = {
          largura_mm: Number(data.largura_mm ?? 85),
          altura_mm: Number(data.altura_mm ?? 38),
          espessura_mm: Number(data.espessura_mm ?? 4),
          relevo_mm: Number(data.relevo_mm ?? 1.2),
          furo_mm: Number(data.furo_mm ?? 5),
          logo: data.logo ?? "RAM",
          tipo: data.tipo ?? "chaveiro"
        };

        return new Response(
          JSON.stringify({
            success: true,
            message: "Dados recebidos pela Ponte RAM 3D!",
            projeto: projeto
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );

      } catch (error) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "JSON inválido",
            details: error.message
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders
            }
          }
        );
      }
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Método não permitido"
      }),
      {
        status: 405,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      }
    );
  }
};
