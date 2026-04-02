const API_URL = 'http://127.0.0.1:5000';

/**
 * Busca todos os produtos da API
 * @returns {Promise<Array>} Lista de produtos
 */
export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/produtos`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data.produtos || [];
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

/**
 * Adiciona um novo produto na API
 * @param {string} nome - Nome do produto
 * @param {number} quantidade - Quantidade
 * @param {number} valor - Valor do produto
 * @returns {Promise<Object>} Produto criado
 */
export const addProduct = async (nome, quantidade, valor) => {
  try {
    const response = await fetch(`${API_URL}/produto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        quantidade: Number(quantidade),
        valor: Number(valor),
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw error;
  }
};

/**
 * Deleta um produto da API
 * @param {string} nome - Nome do produto a ser deletado
 * @returns {Promise<Object>} Resposta da API
 */
export const deleteProduct = async (nome) => {
  try {
    const response = await fetch(`${API_URL}/produto`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    throw error;
  }
};
