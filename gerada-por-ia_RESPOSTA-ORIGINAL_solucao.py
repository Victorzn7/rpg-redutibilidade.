import json
import sys
import argparse


def carregar_json(caminho):
    """Lê um arquivo JSON."""
    with open(caminho, "r", encoding="utf-8") as arquivo:
        return json.load(arquivo)


def detectar_ciclo(disciplinas):
    """Detecta ciclos no grafo de pré-requisitos usando DFS."""

    grafo = {}

    for disciplina in disciplinas:
        codigo = disciplina["codigo"]
        grafo[codigo] = sorted(disciplina.get("prerequisitos", []))

    visitados = set()
    pilha = []
    em_pilha = set()

    def dfs(codigo):
        visitados.add(codigo)
        pilha.append(codigo)
        em_pilha.add(codigo)

        for pre in grafo.get(codigo, []):

            if pre not in grafo:
                continue

            if pre in em_pilha:
                indice = pilha.index(pre)
                return pilha[indice:] + [pre]

            if pre not in visitados:
                resultado = dfs(pre)

                if resultado is not None:
                    return resultado

        pilha.pop()
        em_pilha.remove(codigo)

        return None

    for codigo in sorted(grafo):
        if codigo not in visitados:
            resultado = dfs(codigo)

            if resultado is not None:
                return resultado

    return None


def calcular_liberadas(disciplinas, oferta, aprovadas):
    """Identifica disciplinas cujos pré-requisitos diretos foram aprovados."""

    mapa = {
        disciplina["codigo"]: disciplina
        for disciplina in disciplinas
    }

    liberadas = []
    bloqueadas = []

    for item in oferta:
        codigo = item["codigo"]

        if codigo in aprovadas:
            continue

        disciplina = mapa[codigo]

        prerequisitos = disciplina.get("prerequisitos", [])

        faltam = sorted([
            pre for pre in prerequisitos
            if pre not in aprovadas
        ])

        if len(faltam) == 0:
            liberadas.append(codigo)
        else:
            bloqueadas.append({
                "codigo": codigo,
                "faltam": faltam
            })

    liberadas.sort()
    bloqueadas.sort(key=lambda item: item["codigo"])

    return liberadas, bloqueadas


def calcular_grades(liberadas, disciplinas, oferta, teto_ch):
    """
    Encontra todas as grades com o maior número de disciplinas,
    respeitando os conflitos de horário e o teto de carga horária.
    """

    mapa_disciplinas = {
        disciplina["codigo"]: disciplina
        for disciplina in disciplinas
    }

    mapa_horarios = {
        item["codigo"]: {
            (horario["dia"], horario["turno"])
            for horario in item.get("horarios", [])
        }
        for item in oferta
    }

    melhores_grades = []
    maior_quantidade = -1

    def buscar(indice, grade_atual, horarios_ocupados, carga_atual):

        nonlocal maior_quantidade
        nonlocal melhores_grades

        # Se todas as disciplinas foram analisadas.
        if indice == len(liberadas):

            quantidade = len(grade_atual)

            if quantidade > maior_quantidade:
                maior_quantidade = quantidade
                melhores_grades = [grade_atual.copy()]

            elif quantidade == maior_quantidade:
                melhores_grades.append(grade_atual.copy())

            return

        codigo = liberadas[indice]

        disciplina = mapa_disciplinas[codigo]
        carga = disciplina["ch"]

        horarios = mapa_horarios.get(codigo, set())

        # Primeira possibilidade: incluir a disciplina.
        sem_conflito = horarios.isdisjoint(horarios_ocupados)

        cabe_no_teto = carga_atual + carga <= teto_ch

        if sem_conflito and cabe_no_teto:

            buscar(
                indice + 1,
                grade_atual + [codigo],
                horarios_ocupados.union(horarios),
                carga_atual + carga
            )

        # Segunda possibilidade: não incluir a disciplina.
        buscar(
            indice + 1,
            grade_atual,
            horarios_ocupados,
            carga_atual
        )

    buscar(0, [], set(), 0)

    # Ordena os códigos dentro de cada grade.
    grades_unicas = set()

    for grade in melhores_grades:
        grades_unicas.add(tuple(sorted(grade)))

    # Ordena lexicograficamente todas as soluções.
    resultado = [
        list(grade)
        for grade in sorted(grades_unicas)
    ]

    if not resultado:
        return [[]]

    return resultado


def resolver(caminho_matriz, caminho_oferta, caminho_historico):

    matriz = carregar_json(caminho_matriz)
    oferta_dados = carregar_json(caminho_oferta)
    historico = carregar_json(caminho_historico)

    disciplinas = matriz["disciplinas"]
    oferta = oferta_dados["oferta"]

    aprovadas = set(historico["aprovadas"])
    teto_ch = historico["teto_ch"]

    # 1. Validar a matriz curricular.
    ciclo = detectar_ciclo(disciplinas)

    if ciclo is not None:
        return {
            "ciclo": ciclo,
            "liberadas": None,
            "bloqueadas": None,
            "grades_maximas": None
        }

    # 2. Identificar disciplinas liberadas e bloqueadas.
    liberadas, bloqueadas = calcular_liberadas(
        disciplinas,
        oferta,
        aprovadas
    )

    # 3. Encontrar todas as grades máximas.
    grades_maximas = calcular_grades(
        liberadas,
        disciplinas,
        oferta,
        teto_ch
    )

    # 4. Retornar o resultado no formato exigido.
    return {
        "ciclo": None,
        "liberadas": liberadas,
        "bloqueadas": bloqueadas,
        "grades_maximas": grades_maximas
    }


def main():

    parser = argparse.ArgumentParser(
        description="Sistema de matrícula universitária."
    )

    parser.add_argument(
        "matriz",
        help="Caminho do arquivo matriz.json"
    )

    parser.add_argument(
        "oferta",
        help="Caminho do arquivo oferta.json"
    )

    parser.add_argument(
        "historico",
        help="Caminho do arquivo de histórico do aluno"
    )

    args = parser.parse_args()

    try:
        resultado = resolver(
            args.matriz,
            args.oferta,
            args.historico
        )

        # Imprime somente um JSON na saída padrão.
        print(
            json.dumps(
                resultado,
                ensure_ascii=False,
                indent=2
            )
        )

    except (FileNotFoundError, json.JSONDecodeError, KeyError, TypeError, ValueError) as erro:
        print(
            json.dumps({
                "erro": str(erro)
            }, ensure_ascii=False),
            file=sys.stderr
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
