export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Only POST requests allowed' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const { imagen1, imagen2, opciones } = req.body;

    if (!imagen1 || !imagen2 || !opciones) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4-vision-preview',
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: 'Estas son dos imágenes de una prenda. Decime si las opciones que siguen son compatibles con la prenda.' },
                            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imagen1}` } },
                            { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imagen2}` } },
                            { type: 'text', text: JSON.stringify(opciones, null, 2) }
                        ]
                    }
                ],
                max_tokens: 1000
            })
        });

        const data = await response.json();
        res.status(200).json({ resultado: data.choices?.[0]?.message?.content || 'Sin respuesta' });
    } catch (error) {
        console.error('Error al llamar a OpenAI:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
