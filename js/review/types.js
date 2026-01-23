export function initTravelerType(groupId) {
    const group = document.getElementById(groupId);
    if (!group) return null;

    const tags = group.querySelectorAll('.type-tag');
    let selectedValue = null;

    tags.forEach((tag) => {
        tag.addEventListener('click', () => {
            // 1. 기존에 선택된 태그에서 클래스 제거
            tags.forEach((t) => t.classList.remove('active'));

            // 2. 현재 클릭한 태그에 클래스 추가
            tag.classList.add('active');

            // 3. 선택된 값 업데이트
            selectedValue = tag.getAttribute('data-value');
        });
    });

    // 현재 선택된 값을 반환하는 클로저 함수 리턴
    return {
        getSelectedValue: () => selectedValue,
    };
}
